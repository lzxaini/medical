<template>
    <el-container class="common-layout">
      <el-aside class="menu-bar" :class="{'menu-bar-hide':$store.getters.menuOpen}">
          <MenuBar />
      </el-aside>
      <el-container>
        <el-header class="container-header" height="50px" >
            <NavBar />
        </el-header>
        <el-main style="background-color: #f0f2f5;">
          <router-view v-slot="{ Component }">
              <transition name="el-fade-in-linear" mode="out-in">
                <component :is="Component" />
              </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script setup>
import MenuBar from './MenuBar/index.vue'
import NavBar from './NavBar/index.vue'
</script>
<style lang='scss' scoped>
.common-layout{
  height: 100vh;
  .menu-bar{
    background-color: #545c64;
    overflow-y: overlay;
    overflow-x: hidden;
    transition: width .3s ease-in-out;
    width: 220px;
  }
  .menu-bar-hide{
    width: 64px;
  }
  .container-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>