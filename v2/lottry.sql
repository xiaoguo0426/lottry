/*
Navicat MySQL Data Transfer

Date: 2017-07-11 13:47:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for lottry
-- ----------------------------
DROP TABLE IF EXISTS `lottry`;
CREATE TABLE `lottry` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '大转盘活动名称',
  `start_time` int(10) unsigned NOT NULL COMMENT '开始时间',
  `end_time` int(10) unsigned NOT NULL COMMENT '结束时间',
  `remark` varchar(1000) NOT NULL COMMENT '备注',
  `status` tinyint(1) unsigned NOT NULL COMMENT '状态 0禁用 1启用',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  `update_time` int(10) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='大转盘活动表';

-- ----------------------------
-- Table structure for lottry_address
-- ----------------------------
DROP TABLE IF EXISTS `lottry_address`;
CREATE TABLE `bbm_lottry_address` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '用户id',
  `name` varchar(20) NOT NULL COMMENT '联系人名称',
  `phone` varchar(15) NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='大转盘填写地址表';

-- ----------------------------
-- Table structure for bbm_lottry_count
-- ----------------------------
DROP TABLE IF EXISTS `lottry_count`;
CREATE TABLE `lottry_count` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '抽奖次数',
  `count` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='大转盘次数表';

-- ----------------------------
-- Table structure for bbm_lottry_count_log
-- ----------------------------
DROP TABLE IF EXISTS `lottry_count_log`;
CREATE TABLE `lottry_count_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL COMMENT '充值订单id',
  `order_amount` decimal(12,2) DEFAULT NULL,
  `action_status` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='大转盘次数来源记录表';

-- ----------------------------
-- Table structure for lottry_item
-- ----------------------------
DROP TABLE IF EXISTS `lottry_item`;
CREATE TABLE `lottry_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lottry_id` int(11) NOT NULL COMMENT '抽奖活动id',
  `name` varchar(20) NOT NULL COMMENT '奖项名称',
  `sub_name` varchar(100) NOT NULL COMMENT '奖品名称',
  `amount` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '奖项商品数量',
  `total` int(10) NOT NULL DEFAULT '0' COMMENT '总量',
  `probability` float(5,2) NOT NULL DEFAULT '0.00' COMMENT '中奖率',
  `remark` varchar(400) NOT NULL COMMENT '奖品说明',
  `min_angles` float(3,0) NOT NULL COMMENT '最小角度',
  `max_angles` float(3,0) NOT NULL COMMENT '最大角度',
  `config` varchar(255) NOT NULL COMMENT '奖品配置',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='大转盘奖项配置';

-- ----------------------------
-- Table structure for lottry_prize
-- ----------------------------
DROP TABLE IF EXISTS `lottry_prize`;
CREATE TABLE `lottry_prize` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `lottry_item_id` int(10) unsigned NOT NULL COMMENT '中奖项id',
  `status` tinyint(1) NOT NULL COMMENT '订单状态 ',
  `express_sn` varchar(30) DEFAULT NULL COMMENT '快递单号',
  `express_start_time` int(10) DEFAULT NULL COMMENT '发货时间',
  `express_end_time` int(10) DEFAULT NULL COMMENT '收货时间',
  `create_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `link_name` varchar(20) DEFAULT NULL COMMENT '收货联系人',
  `link_phone` varchar(20) DEFAULT NULL COMMENT '收货手机号',
  `link_address` varchar(100) DEFAULT NULL COMMENT '收货地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='奖品表';

-- ----------------------------
-- Table structure for bbm_lottry_prize_items
-- ----------------------------
DROP TABLE IF EXISTS `lottry_prize_items`;
CREATE TABLE `lottry_prize_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lottry_prize_id` int(10) NOT NULL,
  `type` int(10) NOT NULL COMMENT '中奖类型 1优惠券 2产品',
  `coupon_id` int(10) DEFAULT NULL COMMENT '优惠券id',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `num` int(10) unsigned NOT NULL COMMENT '数量',
  `status` tinyint(3) unsigned NOT NULL COMMENT '状态  type=1 , status=2已领取  type=2，status=1  未发放；status=2 已发送',
  `create_time` int(10) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='中奖奖品';
