const SERVE_API = {
    login:{//登陆
        method:'post',
        url:'/api/user/login',
        arrayFormat: ""
    },
    testApi:{//测试接口
        method:'post',
        url:'/api/user/getHotelId',
        arrayFormat: ""
    }
}

export default SERVE_API;