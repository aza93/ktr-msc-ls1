<?php
require 'connect.php';

// Get the data that I posted from the from part (angular)
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data
  $request = json_decode($postdata);
	
	
  // Sanitize
  $name = mysqli_real_escape_string($con, $request->data->name);
  $companyName = mysqli_real_escape_string($con, $request->data->companyName);
  $emailAddress = mysqli_real_escape_string($con, $request->data->emailAddress);
  $telephoneNumber = mysqli_real_escape_string($con, $request->data->telephoneNumber);
    

  // Store into database.
  $sql = "INSERT INTO `business_card`(`business_card_id`,`name`,`company_name`,`email_address`,`telephone_number`) VALUES (null,'{$name}','{$companyName}','{$emailAddress}','{$telephoneNumber}')";

  // Reponse to front part
  if(mysqli_query($con, $sql))
  {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }
}
