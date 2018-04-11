<template>
    <div class="clearfix">
        <div class="personSafe fr">
            <div class="header">
                <ul>
                    <li>
                        <span>账户安全</span>
                    </li>
                </ul>
            </div>
            <div class="content">
                <ul>
                    <li>
                        <span>当前密码</span>
                        <input type="password" v-model="oldPassword">
                    </li>
                    <li>
                        <span>新密码</span>
                        <input type="password" v-model="newPassword">
                    </li>
                    <li>
                        <span>确认密码</span>
                        <input type="password" v-model="rePassword">
                    </li>
                </ul>
                <div class="btn">
                     <el-button type="primary" size="mini" @click="getUpdatePassword">保存</el-button>
                </div>
            </div>
        </div>
        <div class="personInfo fl">
            <div class="header">
                    <ul>
                        <li>
                            <span>个人信息</span>  
                        </li>
                    </ul>
            </div>
            <div class="content">
                <ul>
                    <li>
                        <span>头像</span>
                        <img :src="imageUrl || 'http://fileserver.yueshijue.com/fileService/uploads/2018/01/19/415163553783837.jpg'" alt="">
                    </li>
                    <li>
                        <span>手机</span> 
                        {{phone}}
                        <div class="info-edit fr">
                            <el-button type="text" @click="dialogFormVisible = true">修改</el-button>

                            <el-dialog title="手机验证" :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                                <el-form-item label="原手机号" :label-width="formLabelWidth">
                                    <el-input class="telIpt" v-model="form.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="新手机号" :label-width="formLabelWidth">
                                    <el-input class="telIpt" v-model="form.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="短信验证码" :label-width="formLabelWidth">
                                    <el-input class="messageIpt" placeholder="请输入验证码" v-model="form.name" auto-complete="off"></el-input>
                                    <el-button type="primary" plain>发送验证码</el-button>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                            </div>
                            </el-dialog>
                            
                        </div>
                    </li>
                    <li>
                        <span>邮箱</span>
                        {{email || '未设置'}}
                        <div class="edit">
                            <div class="info-edit fr">
                                <el-button type="text" @click="dialogFormVisible1 = true">绑定</el-button>

                            <el-dialog title="邮箱验证" :visible.sync="dialogFormVisible1">
                            <el-form :model="form1">
                                <el-form-item style="margin-bottom: 0;" label="邮箱验证" :label-width="formLabelWidth1">
                                    <el-input class="telIpt"  v-model="Emailvalidate" auto-complete="off"></el-input>
                                </el-form-item>
                                <span style="display: block; width:100px; margin-left: 130px; color: red;">{{emailErrorInfo}}</span>
                                <el-button style="margin-left: 130px; margin-top: 15px;" size="mini" type="danger" plain @click="emailValidate">验证邮箱</el-button>
                                <p style="font-size: 12px; margin-left: 130px;" >请在24小时内至您的新邮箱查收验证邮件。</p>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
                            </div>
                            </el-dialog>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span>昵称</span>
                        <input type="text" v-show="isEdit" v-model="nickname">
                        <div class="edit" v-show="!isEdit">
                            {{nickname}}
                        </div>
                    </li>
                    <li>
                        <span>姓名</span>
                        <input type="text" v-show="isEdit" v-model="username">
                        <div class="edit" v-show="!isEdit">
                            {{username}}
                        </div>
                    </li>
                    <li>
                        <span>性别</span>
                        <div class="edit" v-show="isEdit">
                            <el-radio v-model="radio" label="1" name="gender">男</el-radio>
                            <el-radio v-model="radio" label="2" name="gender">女</el-radio>
                        </div>
                        <div class="edit" v-show="!isEdit">
                                {{radio}}
                        </div>
                    </li>
                </ul>
                <div class="btn">
                    <el-button size="mini" type="primary" @click="save" v-show="isEdit">保存</el-button>
                    <el-button size="mini" type="primary" @click="isEdit = true" v-show="!isEdit">编辑</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { personalCenter, checkEmail, updatePassword, perfect } from '@/api'
export default {
    data() {
        return {
            radio: '1',
            isEdit: false,
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            dialogTableVisible1: false,
            dialogFormVisible1: false,
            form1: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth1: '120px',
            picUrl: '',
            phone: '',
            email: '',
            nickname: '',
            username: '',
            sex: '',
            Emailvalidate: '',
            emailErrorInfo:'',
            oldPassword: '',
            newPassword: '',
            rePassword: '',
            imageUrl: ''
        }
    },
    created(){
        this.handleSex()
        this.getPersonalCenter()
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        getPersonalCenter() {
            let data = {}
            personalCenter(data).then( res => {
                if(res.data.status === 1) {
                    var selfInfo = res.data.data
                    this.phone = selfInfo.phone
                    this.email = selfInfo.email
                    this.nickname = selfInfo.nickname
                    this.username = selfInfo.username
                    this.radio = selfInfo.sex
                }else {
                    this.$message(res.data.msg)
                }
            })
        },
        getUpdatePassword() {
            let data = {
                password: this.oldPassword,
                newPassword: this.newPassword
            }
            updatePassword(data).then( res => {
                if(res.data.status == 1) {
                    this.$message(res.data.msg)
                }else {
                    this.$message(res.data.msg)
                }
            })
        },
        emailValidate() {
            if (this.Emailvalidate.trim().length == "")
            return (this.emailErrorInfo = "邮箱不能为空");
            var emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱
            if (!emailReg.test(this.Emailvalidate)) return (this.emailErrorInfo = "邮箱格式不对");
            this.emailErrorInfo = "";
            let data = {
                email: this.Emailvalidate
            }
            checkEmail(data).then( res => {
                if(res.data.status === 1){
                    this.$message(res.data.msg)
                }else {
                    this.$message(res.data.msg)
                }
            })
        },
        save() {
            this.isEdit = false
            if(this.radio == '1') {
                this.radio = '男'
            }else if(this.radio == '2'){
                this.radio = '女'
            }
            
            let data = {
                nickname: this.nickname,
                realName: this.username,
                picUrl: 'http://fileserver.yueshijue.com/fileService/uploads/2018/01/19/415163553783837.jpg',
                sex: this.sex
            }
            perfect(data).then( res => {
                if(res.data.status == 1) {
                    this.$message(res.data.msg)
                }else {
                    this.$message(res.data.msg)
                }
            })
        },
        handleSex() {
            if(this.radio == '1') {
                this.radio = '男'
            }else if(this.radio == '2'){
                this.radio = '女'
            }
        },
        
    }
}
</script>

<style lang="scss" scoped>
.personInfo{
    width: 500px;
    height: 600px;
    border: 1px solid #dedede;
    margin-bottom: 50px;
    float: left;
}
.personSafe{
    width: 500px;
    height: 600px;
    border: 1px solid #dedede;
    margin-left: 25px;
    float: right;
}
    .header{
        height: 57px;
        border-bottom: 1px solid #dedede;
        li{
            float: left;
            position: relative;
            &:first-child {
                border-bottom: 3px solid #19A9E8;
            }
            &:hover{
                 border-bottom: 3px solid #19A9E8;
            }
            span{
                    height: 100%;
                    line-height: 53px;
                    padding: 0 20px;
                    font-size: 16px;
                    cursor: pointer;
            }  
        }
    }
    .content {
        ul{
            margin: 20px 40px;
            li {
                width: 330px;
                height: auto;
                margin: 40px 0;
                position: relative;
                span {
                    display: inline-block;
                    width: 70px;
                }
                img {
                    display: inline-block;
                    position: absolute;
                    top: -15px;
                    left: 60px;
                    width: 60px;
                    height: 60px;
                }
                a {
                    display: inline-block;
                    float: right;
                    color: #409EFF;
                }
                input {
                    width: 230px;
                    height: 36px;
                    line-height: 36px;
                    outline: none;
                    border: 1px solid #DEDEDE;
                    padding: 15px;
                    border-radius: 5px;
                }
                .edit {
                    display: inline;
                    position: relative;
                    // .avatars {
                    //     display: inline-block;
                    //     position: absolute;
                    //     top: -15px;
                    //     left: 0px;
                    //     width: 60px;
                    //     height: 60px;
                        .avatar-uploader .el-upload {
                            border: 1px dashed #ddd;
                            border-radius: 6px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                        }
                        .avatar-uploader .el-upload:hover {
                            border-color: #409EFF;
                        }
                        .avatar-uploader-icon {
                            display: inline-block;
                            position: absolute;
                            top: -30px;
                            left: 80px;
                            font-size: 20px;
                            color: #8c939d;
                            width: 60px;
                            height: 60px;
                            line-height: 60px;
                            text-align: center;
                        }
                        .avatar {
                            width: 60px;
                            height: 60px;
                            display: block;
                        }
                    // }
                    
                }
                .info-edit {
                    display: inline;
                    float: right;
                    button {
                    }
                    .telIpt {
                        width: 300px;
                    }
                    .messageIpt {
                        width: 183px;
                    }
                }
            }
        }
        .btn {
            margin: 20px 100px;
        }
       
    }


</style>
