<?php

namespace App\Services;

class FirebaseAuthService
{
    private $keys_file; 
    private $cache_file;
    private $fbProjectId;

    function __construct($config = null) {
        $firebase_config = $config ?: config('firebase');
        $this->keys_file = $firebase_config['authentication']['keys_file']; // the file for the downloaded public keys
        $this->cache_file = $firebase_config['authentication']['cache_file']; // this file contains the next time the system has to revalidate the keys
        $this->fbProjectId = $firebase_config['project_id'];
    }

    /**
     * Obtem a credencial pelo Token do Firebase
     * 
     * @param string $token  Token de login do firebase
     * @return mixed  Credencial ou ["error" => string]
     */
    function verifyFirebaseToken($token = '')
    {
        $return = array();
        $userId = $deviceId = "";
        $this->checkKeys();
        $pkeys_raw = $this->getKeys();
        if (!empty($pkeys_raw)) {
            $pkeys = json_decode($pkeys_raw, true);
            try {
                $decoded = \Firebase\JWT\JWT::decode($token, $pkeys, ["RS256"]);
                if (!empty($decoded)) {
                    // do all the verifications Firebase says to do as per https://firebase.google.com/docs/auth/admin/verify-id-tokens
                    // exp must be in the future
                    $exp = $decoded->exp > time();
                    // ist must be in the past
                    $iat = $decoded->iat < time();
                    // aud must be your Firebase project ID
                    $aud = $decoded->aud == $this->fbProjectId;
                    // iss must be "https://securetoken.google.com/<projectId>"
                    $iss = $decoded->iss == "https://securetoken.google.com/$this->fbProjectId";
                    // sub must be non-empty and is the UID of the user or device
                    $sub = $decoded->sub;
                    if ($exp && $iat && $aud && $iss && !empty($sub)) {
                        // we have a confirmed Firebase user!
                        // build an array with data we need for further processing
                        $return['UID'] = $sub;
                        $return['email'] = $decoded->email;
                        $return['email_verified'] = $decoded->email_verified;
                        $return['name'] = $decoded->name;
                        $return['picture'] = $decoded->picture ?: $decoded->photo ?: "";
                    } else {
                        $return['error'] = 'Invalid token';
                    }
                }
            } catch (Exception $e) {
                $return['error'] = $e->getMessage();
            }
        }
        return $return;
    }

    /**
    * Checks whether new keys should be downloaded, and retrieves them, if needed.
    */
    function checkKeys()
    {
        if (file_exists($this->cache_file)) {
            $fp = fopen($this->cache_file, "r+");
            if (flock($fp, LOCK_SH)) {
                $contents = fread($fp, filesize($this->cache_file));
                if ($contents > time()) {
                    flock($fp, LOCK_UN);
                } elseif (flock($fp, LOCK_EX)) { // upgrading the lock to exclusive (write)
                    // here we need to revalidate since another process could've got to the LOCK_EX part before this
                    if (fread($fp, filesize($this->cache_file)) <= time()) 
                    {
                        $this->refreshKeys($fp);
                    }
                    flock($fp, LOCK_UN);
                } else {
                    throw new \RuntimeException('Cannot refresh keys: file lock upgrade error.');
                }
            } else {
                // you need to handle this by signaling error
                throw new \RuntimeException('Cannot refresh keys: file lock error.');
            }
            fclose($fp);
        } else {
            $this->refreshKeys();
        }
    }
    
    /**
     * Downloads the public keys and writes them in a file. This also sets the new cache revalidation time.
     * 
     * @param null $fp the file pointer of the cache time file
     */
    function refreshKeys($fp = null)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        $data = curl_exec($ch);
        $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $headers = trim(substr($data, 0, $header_size));
        $raw_keys = trim(substr($data, $header_size));
        if (preg_match('/age:[ ]+?(\d+)/i', $headers, $age_matches) === 1) 
        {
            $age = $age_matches[1];
            if (preg_match('/cache-control:.+?max-age=(\d+)/i', $headers, $max_age_matches) === 1) {
                $fp_keys = fopen($this->keys_file, "w");
                if (flock($fp_keys, LOCK_EX)) {
                    fwrite($fp_keys, $raw_keys);
                    fflush($fp_keys);
                    flock($fp_keys, LOCK_UN);
                }
                fclose($fp_keys);
                $valid_for = $max_age_matches[1] - $age;
                $fp_cache = $fp ?: fopen($this->cache_file, "w");
                ftruncate($fp_cache, 0);
                fwrite($fp_cache, "" . (time() + $valid_for));
                fflush($fp_cache);
                if(!isset($fp)) fclose($fp_cache);
            }
        }
    }
    
    /**
     * Retrieves the downloaded keys.
     * This should be called anytime you need the keys (i.e. for decoding / verification).
     * 
     * @return null|string
     */
    function getKeys()
    {
        $fp = fopen($this->keys_file, "r");
        $keys = null;
        if (flock($fp, LOCK_SH)) {
            $keys = fread($fp, filesize($this->keys_file));
            flock($fp, LOCK_UN);
        }
        fclose($fp);
        return $keys;
    }

    /**
     * Obtem o IP da requisição
     * 
     * @param Usuario $usuario Usuário model
     * @param mixed $credencial  Dados retornados do login
     */
    public function fillUsuarioWithCredential($usuario, $credencial) {
        $usuario->password = Hash::make($credencial["email"]);
        $usuario->email = $credencial["email"];
        $usuario->nome = $credencial["name"];
        $usuario->id_google = $credencial["UID"];
        $usuario->apelido = $credencial["name"];
    }
}