<?php

require 'lottryItems.php';

$_data = [
'id'=>1,
'name'=>'暑假大转盘活动',
'remark'=>'1.每人消费满100即可获得一次大转盘机会；2.最终解释权归公司所有',
'items'=>$lottryItems
];
$data = [
	'status'=>1,
	'msg'=>'获取成功',
	'data'=>$_data
];

exit(json_encode($data));