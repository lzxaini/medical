<template>
    <div>
        <div>全局变量{{store.getters.menuOpen}}</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        <div>ho</div>
        home home home home
    </div>
</template>

<script setup>
//reactive定义复杂的数据类型的数据,ref推荐定义基本数据类型
import { useStore } from 'vuex'
import { ref} from 'vue'
const store = useStore()
</script>
