# 使用node 10.13的版本
FROM node:10.13

# 安装nginx
RUN apt-get update \    && apt-get install -y nginx

# 指定工作目录
WORKDIR /app

# 将当前目录下的所有文件拷贝到工作目录
COPY . /app/

# 声明运行时容器提供的服务端口
EXPOSE 80

# 1.安装依赖
# 2.运行npm run build
# 3.将production目录的所有文件拷贝到nginx目录下
# 4.删除工作的目录文件，尤其是node_modules 以减少镜像体积
# 由于镜像构建的每一步会产生新层
# 为了减少镜像体积，尽可能将一些同类操作，集成到一个步骤中，如下
RUN  npm install \
     && npm run build \
     && cp -r production/* /var/www/html \
     && rm -rf /app

# 以前台的方式启动 nginx
CMD ["nginx","-g","daemon off;"]
