// 全局变量
var vm;
var mde;

// 过滤标签
var filterLabels = function() {
  var _that = this;
  return this.labels.filter(function(label) {
    return _that.labelInputValue == "" || label.indexOf(_that.labelInputValue) >= 0;
  })
}

// 添加标签
var addLabel = function(label) {

  // 最多使用5个标签
  if(this.selectLabels.length == 5) return;

  if(this.selectLabels.indexOf(label) < 0) {
    this.selectLabels.push(label);
  }
}

// 删除标签
var delLabel = function(index) {
  this.selectLabels.splice(index, 1);
}

// 标签输入框聚焦
var ssInputFocus = function() {
  this.labelSearchShow = true;
}

// 标签输入框失去焦点
var ssInputBlur = function(event) {
  this.labelSearchShow = false;
}

// 标签输入框改变时
var ssInputChange = function() {
            
  if(this.selectLabels.length == 5 || this.labelInputValue == "") return;

  if(this.labels.indexOf(this.labelInputValue) < 0) {
    alert("该标签不存在");
  } else if(this.selectLabels.indexOf(this.labelInputValue) < 0) {
    this.selectLabels.push(this.labelInputValue);
  }

  // 最后都是清空输入
  this.labelInputValue = "";
}

// 提交配置
var submitLabel = function() {

  var that = this;

  // md 内容判断
  var mdStr = mde.value();
  if(mdStr.length < 80) {
    alert("请输入配置内容，且长度不低于10个字符");
    return;
  }

  // 标签内容判断
  if(this.selectLabels.length == 0) {
    alert("请选择标签");
    return;
  }

  if(this.selectLabels.length > 5) {
    alert("最多使用5个标签");
    return;
  }

  $.post("/api/postcfg", {
    mdStr: mdStr,
    labels: that.selectLabels.join(";"),
    title: that.title,
    abstract: that.abstract
  }).then(function(data) {

    if(typeof data == "string") {
      alert(data);
      return;
    }

    if(data.errorCode == 0) {
      alert(data.info);
    } else {
      alert(data.errorInfo);
    }
  })
}

// 获取所有标签
var getLabels = function() {
  $.post("/api/getlabels").then(function(data) {
    if(typeof data == "string") {
      alert(data);
      return;
    }

    if(data.errorCode == 0) {

      vm.labels = data.rows.map(function(rowdata) {
        return rowdata.name;
      });

    } else {
      alert(data.errorInfo);
    }
  })
}

// 页面初始化完成开始做逻辑
$(function() {

  vm = new Vue({
    el: "#app",
    data: {
      labelSearchShow: false,
      labelInputValue: "",
      selectLabels: [],
      labels: [],
      title: "",
      abstract: ""
    },
    computed: {
      filterLabels
    },
    methods: {
      addLabel,
      delLabel,
      ssInputFocus,
      ssInputBlur,
      ssInputChange,
      submitLabel
    }
  });

  mde = new SimpleMDE({
    element: document.getElementById("mde"),
    autoDownloadFontAwesome: false,
    toolbar: false,
    placeholder: "1. 这里输入你的配置代码和注释, 使用 markdown 语法\r\n\n2. 长度不低于10"
  });

  getLabels();

})
