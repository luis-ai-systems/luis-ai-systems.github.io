---
layout: post
title: 在docker-desktop中启动kubernets
categories: kubernets
description: 开始学习kubernets
keywords: docker,kubernets,k8s,kind
---
# 在docker-desktop中启动kubernets
![点击开关](/images/posts/docker/1100.png)
![可以调节节点数量](/images/posts/docker/1200.png)
这个过程会去下载镜像

# 在容器界面
![可以看到cluster的容器](/images/posts/docker/1300.png)

## 创建dashboard
```shell
PS C:\Users\Lenovo> kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
namespace/kubernetes-dashboard created
serviceaccount/kubernetes-dashboard created
service/kubernetes-dashboard created
secret/kubernetes-dashboard-certs created
secret/kubernetes-dashboard-csrf created
secret/kubernetes-dashboard-key-holder created
configmap/kubernetes-dashboard-settings created
role.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrole.rbac.authorization.k8s.io/kubernetes-dashboard created
rolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
deployment.apps/kubernetes-dashboard created
service/dashboard-metrics-scraper created
deployment.apps/dashboard-metrics-scraper created
```
#### 通过代理方式进入
```shell
kubectl proxy --port=8001
```

```输入url
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login
```
进入![dashborad界面](\images/posts/docker/1400.png)

检查 kubernetes-dashboard 命名空间下的 ServiceAccount 是否已经存在：
```
kubectl get serviceaccount -n kubernetes-dashboard
```

显示内容如下：
```
PS C:\Users\Lenovo> kubectl get serviceaccount -n kubernetes-dashboard
NAME                   SECRETS   AGE
default                0         153m
kubernetes-dashboard   0         153m
```
然后获取service-token
```
kubectl -n kubernetes-dashboard create token kubernetes-dashboard
```
进入页面如下
[kuberbets界面](images/posts/docker/1500.png)

#### 但是上面进入的权限不够创建新的服务名
1️⃣ 创建 admin-user ServiceAccount
```
kubectl create serviceaccount admin-user -n kubernetes-dashboard
```
2️⃣ 创建 ClusterRoleBinding，授予 admin-user cluster-admin 权限
```
kubectl create clusterrolebinding admin-user \
  --clusterrole=cluster-admin \
  --serviceaccount=kubernetes-dashboard:admin-user
```
3️⃣ 获取 admin-user 登录的 Token
```
kubectl -n kubernetes-dashboard create token admin-user
```



asdsadsadsadsaduahd
