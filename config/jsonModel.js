/**
 * Created by koudaiwang on 2017/6/19.
 */





module.exports = {
    JsonModel: function (content, statuss, msg) {
        this.status = statuss || 1;
        this.msg = msg;
        this.content = content;
    }
}