<?php
header("Content-Type: application/json");

// Dummy data
$users = [
  ["id" => 1, "name" => "John Doe", "email" => "john@example.com"],
  ["id" => 2, "name" => "Jane Doe", "email" => "jane@example.com"]
];

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

function handleGetRequest()
{
  global $users;
  echo json_encode($users);
}

function handlePostRequest()
{
  $inputJSON = file_get_contents('php://input');
  $input = json_decode($inputJSON, true);

  if (isset($input['bushing'])) {
    $bushing = $input['bushing'];
    if ($bushing === "pomegranate") {
      echo json_encode([
        "a" => "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", "b" => "faf0e31614135089f8eee55a7df4ca28", "c" => "6e35fa72d38e45b97839f194edd0a5ef", "d" => "6d7973656372657470617373776f7264"
      ]);
      exit;
    }
    http_response_code(400);
    echo json_encode(["message" => "Invalid input"]);
    exit;
  } else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input"]);
    exit;
  }
}
// Process the request
switch ($method) {
  case 'GET':
    handleGetRequest();
    break;
  case 'POST':
    handlePostRequest();
    //     break;
    // case 'PUT':
    //     handlePutRequest();
    //     break;
    // case 'DELETE':
    //     handleDeleteRequest();
    //     break;
  default:
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
    break;
}
