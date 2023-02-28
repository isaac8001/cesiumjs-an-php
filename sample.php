<?php
if(isset($_POST['submit'])){
	$fileName = $_FILES['file']['name'];
	$fileType = $_FILES['file']['type'];
	$fileTmpName = $_FILES['file']['tmp_name'];
	$fileError = $_FILES['file']['error'];
	$fileSize = $_FILES['file']['size'];

	$fileExt = explode('.', $fileName);
	$fileActualExt = strtolower(end($fileExt));

	$allowed = array('jpg', 'jpeg', 'png', 'pdf');

	if(in_array($fileActualExt, $allowed)){
		if($fileError === 0){
			if($fileSize < 1000000){
				$fileNameNew = uniqid('', true).".".$fileActualExt;
				$fileDestination = 'attach/'.$fileNameNew;
				move_uploaded_file($fileTmpName, $fileDestination);
				echo "파일이 성공적으로 업로드되었습니다.";
			} else {
				echo "파일이 너무 큽니다.";
			}
		} else {
			echo "파일 업로드 도중 오류가 발생하였습니다.";
		}
	} else {
		echo "이 파일 형식은 업로드할 수 없습니다.";
	}
}
?>