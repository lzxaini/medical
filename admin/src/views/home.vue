<template>
    <div>
        <div>全局变量{{ store.getters.menuOpen }}</div>
        <el-button @click="Login">接口访问</el-button>
    </div>
</template>

<script setup lang="ts">
import { loginFun } from '../api/api'
//reactive定义复杂的数据类型的数据,ref推荐定义基本数据类型
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
const Login = () => {
    let params = {
        account: "00001",
        password: "123456"
    }
    loginFun(params).then((res: any) => {
        console.log('测试', res)
    })
}
</script>
