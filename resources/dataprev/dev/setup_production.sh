# Oculta assinaturas do servidor apache2
sed -i "s/ServerTokens OS/ServerTokens Prod/" /etc/apache2/conf-available/security.conf
sed -i "s/ServerSignature On/ServerSignature Off/" /etc/apache2/conf-available/security.conf