<?php

/**
 * 
 * php + ajax 幸运大转盘
 * @author Sim <326196998@qq.com>
 * @time 2014年9月25日15:37:32
 * @url http://www.yiifcms.com/
 * 
 */

//奖项初始化
$prize_arr = array(
		'0' => array('id'=>1,'min'=>1,'max'=>29,'prize'=>'一等奖','v'=>1),
		'1' => array('id'=>2,'min'=>302,'max'=>328,'prize'=>'二等奖','v'=>2),
		'2' => array('id'=>3,'min'=>242,'max'=>268,'prize'=>'三等奖','v'=>5),
		'3' => array('id'=>4,'min'=>182,'max'=>208,'prize'=>'四等奖','v'=>7),
		'4' => array('id'=>5,'min'=>122,'max'=>148,'prize'=>'五等奖','v'=>10),
		'5' => array('id'=>6,'min'=>62,'max'=>88,'prize'=>'六等奖','v'=>25),
		'6' => array('id'=>7,'min'=>array(32,92,152,212,272,332),
				'max'=>array(58,118,178,238,298,358),'prize'=>'七等奖','v'=>50)
);

//抽奖开始
foreach ($prize_arr as $key => $val) {
	$arr[$val['id']] = $val['v'];
}

$rid = getRand($arr); //根据概率获取奖项id

$res = $prize_arr[$rid-1]; //中奖项
$min = $res['min'];
$max = $res['max'];
if($res['id']==7){ //七等奖
	$i = mt_rand(0,5);
	$result['angle'] = mt_rand($min[$i],$max[$i]);
}else{
	$result['angle'] = mt_rand($min,$max); //随机生成一个角度
}
$result['prize'] = $res['prize'];

echo json_encode($result);

/**
 * 根据概率获取奖项
 * @param unknown $proArr
 * @return Ambigous <string, unknown>
 */
function getRand($proArr) {
	$result = '';

	//概率数组的总概率精度
	$proSum = array_sum($proArr);

	//概率数组循环
	foreach ($proArr as $key => $proCur) {
		$randNum = mt_rand(1, $proSum);
		if ($randNum <= $proCur) {
			$result = $key;
			break;
		} else {
			$proSum -= $proCur;
		}
	}
	unset ($proArr);

	return $result;
}
