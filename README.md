## MONGO DB

### 1.Docker run

```shell
docker run --name mongodb -v ~/data:/data/db -d -p 27017:27017 mongo
```

### 2.명령어

```shell
show collections;
use chatdb;

# 버퍼사이즈 늘려주기
db.runCommand({convertToCapped: 'chat', size: 8192});

# 저장 직접 해보기
db.chat.save({sender:'ssar', receiver:'cos', msg:'안녕'});

# 조회
db.chat.find();
db.chat.find().pretty();
```

