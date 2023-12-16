<?php

include_once("donationClass.php");
include_once("connect_data.php");

class donationModel extends donationClass
{
    private $link;

    public function OpenConnect()
    {
        $konDat = new connect_data();

        try {
            $this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");
    }

    public function CloseConnect()
    {
        if ($this->link) {
            mysqli_close($this->link);
            $this->link = null;
        }
    }

   
    public function insertDonation()
    {
        $this->OpenConnect();
        $nombre = $this->getNombre();
        $mensaje = $this->getMensaje();
        $cantidad = $this->getCantidad();
        
        $sql = "CALL spInsertDonation('$nombre','$mensaje','$cantidad')";

        if ($this->link->query($sql)) {
            $this->CloseConnect();
            return true;
        } else {
            $this->CloseConnect();
            return false;
        }
    }
}
