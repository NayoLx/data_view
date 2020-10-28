
//缓存知识库
export function getAnalyseKnowLedge() {
    var json = require('../assets/json/AnalyseKnowledge.json');
    return json;
}

export function getKnowLedge() {
    var json = require('../assets/json/knowledge.json');
    return json;
}

//通过知识库获取省份
export function getCityToProvince(region, city) {
    var province;
    //直辖市
    if (city == '北京市' || city == '上海市' || city == '重庆市' || city == '天津市') {
        return city.replace('市', '');
    }
    Object.keys(region).map((value) => {
        Object.keys(region[value]).map((val) => {
            if (val == city) {
                province = value;
            }
        });
    });
    return province;
}

//获取省份名称
export function geyCityName(province) {
    var name = null;
    var cityArr = [
        ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'],
        ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan']
    ];
    for (var i = 0, len = cityArr[0].length; i < len; i++) {
        if (province == cityArr[0][i]) {
            // 获取得城市拼音
            name = {
                'zh_name': cityArr[0][i],
                'py_name': cityArr[1][i]
            }
        }
    }
    return name;
}

//获取属于当前省份的城市 -- 暂无用到的地方
export function getCityArrInProvince(region, province, cityArr) {
    var newCityArr = [];
    cityArr.forEach(element => {
        var p_name;
        //直辖市
        if (element.name == '北京市' || element.name == '上海市' || element.name == '重庆市' || element.name == '天津市') {
            p_name = element.name.replace('市', '');
        } else {
            Object.keys(region).map((value) => {
                Object.keys(region[value]).map((val) => {
                    if (val == element.name) {
                        p_name = value;
                    }
                });
            });
        }
        if (p_name == province) {
            newCityArr.push(element);
        }
    });

    return newCityArr;
}

export default {
    getAnalyseKnowLedge,
    getKnowLedge,
    getCityToProvince,
    geyCityName,
    getCityArrInProvince
}