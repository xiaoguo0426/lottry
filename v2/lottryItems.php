<?php
//中奖概率如果为0或奖项库存量为0，则永远抽不中【sql where probability > 0 and amount > 0】
//最小角度和最大角度：奖项的起始角度和结束角度【前端扇形是均分的】；如果有6个奖项，则每一个扇形的角度为60，那第一个扇形的最小角度和最大角度需要设置为10-50，第二个扇形的最小角度和最大角度需要设置为70-110，以此类推。最小角度要比起始角度要大一点，最大角度要比结束角度要小一点，这样指针就不会指向两个奖项的中间，可以避免客户迷惑和以后的投诉

$lottryItems = [

			[
				'id'=>1,										//奖项id
				'lottry_id'=>12,								//抽奖活动id
				'name'=>'9600cp大礼包',							//奖项名称
				'sub_name'=>'一等奖',							//奖项子名称
				'amount'=>1,									//奖项库存量
				'total'=>1,										//奖项总量
				'probability'=>0.1,								//中奖率
				'remark'=>'尊享体检女士套餐/尊享体检男士套餐',	//备注
				'min_angles'=>10,								//最小角度
				'max_angles'=>50								//最大角度
			],
			[
				'id'=>2,
				'lottry_id'=>12,
				'name'=>'5180cp大礼包',
				'sub_name'=>'二等奖',
				'amount'=>1,
				'total'=>1,
				'probability'=>0.9,
				'remark'=>'巴厘岛纯玩大礼包',
				'min_angles'=>70,
				'max_angles'=>90
			],
			[
				'id'=>3,
				'lottry_id'=>12,
				'name'=>'536cp大礼包',
				'sub_name'=>'三等奖',
				'amount'=>1,
				'total'=>1,
				'probability'=>4,
				'remark'=>'咖啡礼盒套装',
				'min_angles'=>110,
				'max_angles'=>140
			],
			[
				'id'=>4,
				'lottry_id'=>12,
				'name'=>'300cp优惠券',
				'sub_name'=>'四等奖',
				'amount'=>1,
				'total'=>1,
				'probability'=>15,
				'remark'=>'300cp优惠券',
				'min_angles'=>170,
				'max_angles'=>190
			],
			[
				'id'=>5,
				'lottry_id'=>12,
				'name'=>'200cp优惠券',
				'sub_name'=>'五等奖',
				'amount'=>1,
				'total'=>1,
				'probability'=>20,
				'remark'=>'200cp优惠券',
				'min_angles'=>210,
				'max_angles'=>240
			],
			[
				'id'=>6,
				'lottry_id'=>12,
				'name'=>'100cp优惠券',
				'sub_name'=>'六等奖',
				'amount'=>1,
				'total'=>1,
				'probability'=>20,
				'remark'=>'100cp优惠券',
				'min_angles'=>270,
				'max_angles'=>290
			],
			[
				'id'=>6,
				'lottry_id'=>12,
				'name'=>'100cp优惠券',
				'sub_name'=>'七等奖',
				'amount'=>1,
				'total'=>1,
				'probability'=>40,
				'remark'=>'100cp优惠券',
				'min_angles'=>310,
				'max_angles'=>350
			]
	];