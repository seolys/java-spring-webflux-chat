## MONGO DB

### 1.Docker run

```shell
docker run --name mongodb -v ~/data:/data/db -d -p 27017:27017 mongo
```

### 2.명령어

```shell
show databases;
use chatdb;

show collections;

# chat Collection 생성
db.createCollection( "chat", { capped: true, size: 8192 } )

# Capped 되어 있는 확인 방법

#db.collection.isCapped()

#Capped이 되지 않는 collection을 capped으로 변경하는 방법
#db.runCommand({convertToCapped: 'chat', size: 8192});

# 저장 직접 해보기
db.chat.save({sender:'ssar', receiver:'cos', msg:'안녕'});

# 조회
db.chat.find();
db.chat.find().pretty();
```

