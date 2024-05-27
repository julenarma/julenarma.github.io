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
    public function getAllDonations()
    {
        $this->OpenConnect();

        $sql = "CALL spAllDonations()";

        $list = array();

        $result = $this->link->query($sql);

        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

            $new = new donationModel();
            $new->idDonacion = $row['id'];
            $new->nombre = $row['nombre'];
            $new->mensaje = $row['mensaje'];
            $new->cantidad = $row['cantidad'];
            $new->fecha = $row['fecha'];

            array_push($list, get_object_vars($new));
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return ($list);
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
