<?php

include_once 'connect_data.php';
include_once 'contactClass.php';
include_once 'contactModel.php';


class contactModel extends contactClass
{

	private $link;
	private $contactList; // Cambiado de $list a $contactList

	public function getList()
	{
		return $this->contactList;
	}

	public function setList($list)
	{
		$this->contactList = $list;
	}
	public function OpenConnect() {
		$konDat = new connect_data();
		try {
			$this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
			if ($this->link->connect_error) {
				die("Error de conexión: " . $this->link->connect_error);
			}
		} catch (Exception $e) {
			echo $e->getMessage();
		}
		$this->link->set_charset("utf8");
	}
	
	public function CloseConnect()
	{
		mysqli_close($this->link);
	}


	public function insertContact()
	{
		$this->OpenConnect();

		$titulo = $this->getNombre();
		$email = $this->getEmail();
		$asunto = $this->getAsunto();
		$mensaje = $this->getMensaje();

		$sql = "CALL cInsertContact('$titulo','$email','$asunto','$mensaje')";

		if ($this->link->query($sql)) {
			$this->CloseConnect();
			return true;
		} else {
			$this->CloseConnect();
			return false;
		}
	}


	public function objVars()
	{

		return get_object_vars($this);
	}
}
