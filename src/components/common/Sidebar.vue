<template>
    <div class="sidebar">

        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.childrens">
                    <el-submenu :index="item.menu">
                        <template slot="title">
                            <i :class="item.icon"></i>{{ item.menuName }}</template>
                        <el-menu-item v-for="(subItem,i) in item.childrens" :key="i" :index="subItem.menu">{{ subItem.menuName }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.menu">
                        <i :class="item.icon"></i>{{ item.menuName }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>

    import {post} from '../../js/axiosApi'
export default {
    data() {
        return {
            items: [
            ]
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        this.getAllMenus();
    },
    methods: {
        getAllMenus() {
            let self = this;
            this.items = [{
                icon: 'el-icon-setting',
                menu: 'readme',
                menuName: '自述'
            },

            {
                icon: 'el-icon-menu',
                menu: '2',
                menuName: '数据管理',
                childrens: [
                    {
                        menu: 'userList',
                        menuName: '用户管理'
                    }
                ]
            }];

        }
    }

}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    width: 170px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: black;
    alignment: left;
}

.sidebar>ul {
    height: 100%;
}

.el-menu {
    border-radius: 2px;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: black;
}

.sidebar .content {
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 0px;
    right: 0;
    top: 70px;
    bottom: 0;
    width: auto;
    padding: 40px;
    box-sizing: border-box;
    overflow-y: scroll;
}
.content {
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 200px;
    right: 0;
    top: 70px;
    bottom: 0;
    width: auto;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: scroll;
}
.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 150px;
}
</style>

