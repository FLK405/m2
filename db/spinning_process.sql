DROP TABLE IF EXISTS spinning_process;

-- 创建纺丝工艺表
CREATE TABLE spinning_process (
    id SERIAL PRIMARY KEY,
    fiber_batch_no VARCHAR(50) NOT NULL UNIQUE,
    resin_id VARCHAR(50) NOT NULL,
    resin_grade VARCHAR(100),
    resin_mn DECIMAL(10,2),
    resin_mw DECIMAL(10,2),
    resin_pdi DECIMAL(5,2),
    resin_crystallinity DECIMAL(5,2),
    resin_melting_point DECIMAL(5,2),
    solution_concentration DECIMAL(5,2),
    spinning_temp DECIMAL(5,2),
    screw_speed DECIMAL(10,2),
    bath_composition TEXT,
    bath_temp DECIMAL(5,2),
    drawing_temp DECIMAL(5,2),
    drawing_ratio DECIMAL(5,2),
    solvent_removal TEXT,
    post_process TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 添加表注释
COMMENT ON TABLE spinning_process IS '纺丝工艺表';
COMMENT ON COLUMN spinning_process.id IS '主键ID';
COMMENT ON COLUMN spinning_process.fiber_batch_no IS '目标纤维批号';
COMMENT ON COLUMN spinning_process.resin_id IS '使用的树脂ID';
COMMENT ON COLUMN spinning_process.resin_grade IS '使用的树脂牌号';
COMMENT ON COLUMN spinning_process.resin_mn IS '所用树脂数均分子量(g/mol)';
COMMENT ON COLUMN spinning_process.resin_mw IS '所用树脂重均分子量(g/mol)';
COMMENT ON COLUMN spinning_process.resin_pdi IS '所用树脂多分散系数(Mw/Mn)';
COMMENT ON COLUMN spinning_process.resin_crystallinity IS '所用树脂结晶度(%)';
COMMENT ON COLUMN spinning_process.resin_melting_point IS '所用树脂熔点(°C)';
COMMENT ON COLUMN spinning_process.solution_concentration IS '原液浓度(%)';
COMMENT ON COLUMN spinning_process.spinning_temp IS '纺丝温度(°C)';
COMMENT ON COLUMN spinning_process.screw_speed IS '双螺杆速率(rpm)';
COMMENT ON COLUMN spinning_process.bath_composition IS '凝固浴组成';
COMMENT ON COLUMN spinning_process.bath_temp IS '凝固浴温度(°C)';
COMMENT ON COLUMN spinning_process.drawing_temp IS '拉伸温度(°C)';
COMMENT ON COLUMN spinning_process.drawing_ratio IS '总拉伸倍数';
COMMENT ON COLUMN spinning_process.solvent_removal IS '溶剂去除工艺';
COMMENT ON COLUMN spinning_process.post_process IS '后处理工艺';
COMMENT ON COLUMN spinning_process.created_at IS '创建时间';
COMMENT ON COLUMN spinning_process.updated_at IS '更新时间';

-- 创建索引
CREATE INDEX idx_fiber_batch_no ON spinning_process(fiber_batch_no);
CREATE INDEX idx_resin_id ON spinning_process(resin_id);
