 <?php
/**
*	抽奖动作--计算旋转的角度，得到的奖品名称返回给前端展示
*	
*	1.判断是否有激活状态的抽奖活动
*	2.判断抽奖活动配置
*	3.判断是否有填写收货地址		//这点根据实际需求
*	4.判断抽奖次数是否大于1
*	5.减少抽奖次数
*	6.计算旋转的角度和得到的奖品
*	7.写入中奖纪录
*	8.减少奖项份数					//如果有控制每份奖项的数量
*	9.json返回给前端展示
*
*/
require 'lottryItems.php';	//奖项配置


function computeLottry($prize_arr)
{
	if (empty($prize_arr)) {
            return false;
        }

        $arr = [];

        foreach ($prize_arr as $key => $val) {
            $arr[$key] = $val['probability'];
        }

        $getPrize = function ($prize_arr, $arr) {
            /**
             * 根据概率获取奖项
             * @param unknown $proArr
             * @return Ambigous <string, unknown>
             */
            $getRand = function ($proArr) {
                $result = '';

                //概率数组的总概率精度
                $proSum = array_sum($proArr);

                //概率数组循环
                foreach ($proArr as $key => $proCur) {
                    $randNum = mt_rand(0.1, $proSum);
                    if ($randNum <= $proCur) {
                        $result = $key;
                        break;
                    } else {
                        $proSum -= $proCur;
                    }
                }
                unset ($proArr);

                return $result;
            };

            $rid = $getRand($arr); //根据概率获取奖项id

            $temp_arr = [];
            foreach ($prize_arr as $key => $value) {
                $temp_arr[$key] = $value;
            }

            $res = $temp_arr[$rid]; //中奖项

            $min = $res['min_angles'];
            $max = $res['max_angles'];

            $result['angles'] = 360 - mt_rand($min, $max); //随机生成一个角度；因为是顺时针转向，所以要360-angles

            $result['prize'] = $res['name'];
            $result['id'] = $res['id'];

            return $result;
        };

        return $getPrize($prize_arr, $arr);
}

$computeResult = computeLottry($lottryItems);

$data = [
	'status'=>1,
	'msg'=>'恭喜您，抽中了' . $computeResult['prize'] . '</br>可在“我的奖品”中查询',
	'data'=>['name' => $computeResult['prize'], 'angles' => $computeResult['angles'], 'count' => 19]
];

header('Content-type: application/json');

exit(json_encode($data));