var vm;

var pos = 0;
var pageSize = 10;

// vue 中方法
var addLabel = function(label, event) {
  if(this.labelsSel.indexOf(label) < 0) {
    this.labelsSel.push(label);
  }
}

var delLabel = function(index, event) {
  this.labelsSel.splice(index, 1);
}

var qBtnClick = function(event) {
  // alert(this.labelsSel.join(";"));
  pos = 0;
  $.post("/api/queryCfg", {
    pos,
    pageSize,
    labels: this.labelsSel.join(";")
  }).then(function(data) {
    if(data.errorCode == 0) {
      vm.cfgs = data.cfgs;
      vm.hasNextPage = data.cfgs.length == pageSize;
    } else {
      alert(data.errorInfo);
    }
  })
}

// 下一页数据获取
var qNextPage = function() {
  pos++;
  $.post("/api/queryCfg", {
    pos,
    pageSize,
    labels: this.labelsSel.join(";")
  }).then(function(data) {
    if(data.errorCode == 0) {
      vm.cfgs = vm.cfgs.concat(data.cfgs);
      vm.hasNextPage = data.cfgs.length == pageSize;
    } else {
      alert(data.errorInfo);
    }
  })
}

// vue 初始化
vm = new Vue({
  el: "#tLabel",
  data: {
    labels: [],
    labelsSel: [],
    cfgs: [],
    hasNextPage: false
  },
  methods: {
    addLabel,
    delLabel,
    qBtnClick,
    qNextPage
  }
});

// 获取所有的标签
var getLabels = function() {
  $.post("/api/getlabels").then(function(data) {
    if(data.errorCode == 0) {
      vm.labels = data.rows.map(function(rowdata) {
        return rowdata.name;
      });
    } else {
      alert(data.errorInfo);
    }
  })
}

getLabels();