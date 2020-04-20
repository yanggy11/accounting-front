<template>
    <div class="header">
        <div class="logo">后台管理系统</div>

        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg"> {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                    <el-dropdown-item command="editUserInfo">设置</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="table" style="width:30%;">
            <el-dialog title="密码修改" :visible.sync="passwordDialogFlag" :modal="true">
                <el-form>
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="name" :disabled="true" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth">
                        <el-input type="password" v-model="userInfo.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码确认" :label-width="formLabelWidth">
                        <el-input type="password" v-model="userInfo.confirmPassword" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="passwordDialogFlag = false">取 消</el-button>
                    <el-button type="primary" @click="editPassword">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'default',
            passwordDialogFlag: false,
            userInfo: {},
            formLabelWidth: '120px'
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('username');
            this.name = username;
            return username;
        }
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'loginout':
                    this.logout();
                    break;
                case 'editPassword':
                    this.passwordDialogFlag = true;
                    break;
                case 'editUserInfo':
                    break;
            }
        },
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        },
        editPassword() {
            this.userInfo.userId = localStorage.getItem("userId");
            this.userInfo.name = localStorage.getItem("username");
            this.$http.post('http://localhost:1987' + '/users/api/user/editPassword',this.userInfo,
                { headers: { "Authorization": localStorage.getItem("AuthenticationToken") } }).
                then(function(data) {
                    this.$message.success("密码修改成功！");
                    this.passwordDialogFlag = false;
                }, function(data) {
                    this.$message.error("密码修改失败!");
                });
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
}

.header .logo {
    float: left;
    width: 200px;
    text-align: center;
}

.user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}

.user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
}

.user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-menu__item {
    text-align: center;
}

.el-dialog__wrapper .el-input__inner {
    width: 70%;
}

.el-dialog__wrapper .input {
    width: 70%;
}


.table .el-dialog--small {
    width: 30%;
}

.table .el-dialog {
    width: 30%;
}

.table .el-button {
    margin-bottom: 0px;
}

.el-dialog__header {
    height: 30;
    padding: 20px 20px 0;
    text-align: left;
    background-color: lightblue;
}
</style>
