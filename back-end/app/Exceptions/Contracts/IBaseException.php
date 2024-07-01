<?php
namespace App\Exceptions\Contracts;

interface IBaseException
{

    /**
     *
     * @return string
     */
    public function getMessage();

    /**
     *
     * @return mixed
     */
    public function getCode();

    /**
     *
     * @return string
     */
    public function getFile();

    /**
     *
     * @return int
     */
    public function getLine();

    /**
     *
     * @return array
     */
    public function getTrace();

    /**
     *
     * @return string
     */
    public function getTraceAsString();

    /**
     *
     * @return \Throwable
     */
    public function getPrevious();

    /**
     *
     * @return string
     */
    public function __toString();
}