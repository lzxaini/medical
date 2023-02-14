<template>
    <el-icon @click="clicka" :size='22' style="cursor: pointer;">
        <icon-expand v-if="store.getters.menuOpen" />
        <icon-fold v-else />
    </el-icon>
    <span>
        欢迎你使用
    </span>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const clicka = () => {
    store.dispatch('ToggleSideBar')
}
</script>
