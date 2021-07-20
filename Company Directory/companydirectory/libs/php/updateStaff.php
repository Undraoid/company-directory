<?php


// example use from browser
// http://localhost/companydirectory/libs/php/getDepartmentByID.php?id=2

// remove next two lines for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

include("config.php");
header('Content-Type: application/json; charset=UTF-8');
$data = [];

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $data;

$conn = new mysqli($host_name, $user_name, $password, $database);

if (mysqli_connect_errno()) {

    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output);

    exit;

}

// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

if (!isset($_REQUEST['staff']) || empty($_REQUEST['staff']) || $_REQUEST['staff'] == '') {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "Staff required.";
    $output['data'] = [];
}

if (!isset($_REQUEST['info']) || empty($_REQUEST['info']) || in_array($_REQUEST['info'], array('firstName', 'lastName', 'email', 'departmentID')) == false) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "no such info.";
    $output['data'] = [];
}

if (!isset($_REQUEST['value'])) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "value required.";
    $output['data'] = [];
}

$query = "UPDATE personnel SET ".$_REQUEST['info']."='".$_REQUEST['value']."'"." WHERE firstName='" . $_REQUEST['staff']."'";
$result = $conn->query($query);
if (!$result) {

    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [];
}


mysqli_close($conn);

echo json_encode($output);

?>