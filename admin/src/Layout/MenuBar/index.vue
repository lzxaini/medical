<template>
    <div class="menu-title">
        <img class="icon" src="../../assets/logo.png" alt="logo"/>
        admin
    </div>
    <el-menu
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        class="menu-vertical-demo"
        :collapse="$store.getters.menuOpen"
        :router='true'
    >
        <template  v-for="item in router.options.routes" :key="item.path+'key'" >
            <template v-if="!item.hidden">
                <el-sub-menu v-if="item.children.length>1" :index="item.path">
                    <template #title>
                        <el-icon><component :is="item.meta.icon" /></el-icon>
                        <span>{{item.meta.title}}</span>
                    </template>
                    <el-menu-item-group v-for="items in item.children" :key='items.path' >
                        <template v-if="!items.hidden">
                            <el-menu-item :index="item.path+'/'+items.path">
                                <el-icon><component :is="items.meta.icon" /></el-icon>
                                <span>{{items.meta.title}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-menu-item v-else-if="!item.children[0].hidden" :index="item.path+'/'+item.children[0].path">
                    <el-icon><component :is="item.children[0].meta.icon" /></el-icon>
                    <span>{{item.children[0].meta.title}}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()
    console.log(router)
</script>
<style lang="scss" scoped>
.menu-vertical-demo{
    border: none;
}
.menu-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 64px;
    color: white;
    font-size: 18px;
    position: relative;
    box-sizing: border-box;
    .icon {
        position: absolute;
        top: 50%;
        left: 18px;
        transform: translateY(-50%);
        border: none;
        width: 34px;
        height: 34px;
    }
}
</style>