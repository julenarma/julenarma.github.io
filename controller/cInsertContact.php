<?php

include_once("../model/contactModel.php");

// Verifica si al menos uno de los campos no está vacío
if (!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['asunto']) && !empty($_POST['mensaje'])) {
    $modeloContacto = new contactModel();
    $response = array();

    $modeloContacto->setNombre($_POST['nombre']);
    $modeloContacto->setEmail($_POST['email']);
    $modeloContacto->setAsunto($_POST['asunto']);
    $modeloContacto->setMensaje($_POST['mensaje']);

    try {
        $response['answer'] = $modeloContacto->insertContact();
        echo json_encode($response);
    } catch (Exception $e) {
        $response['error'] = $e->getMessage();
        echo json_encode($response);
    }

    unset($modeloContacto);
} else {
    echo json_encode(['error' => 'Datos incompletos en la solicitud']);
}
