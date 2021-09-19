package seol.study.chatapp;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {

	@Tailable // 커서를 안닫고 유지한다.
	@Query("{sender: ?0, receiver: ?1}")
	Flux<Chat> mFindBySender(String sender, String receiver); // 흐름

	@Tailable // 커서를 안닫고 유지한다.
	@Query("{roomNum: ?0}")
	Flux<Chat> mFindByRoomNum(Integer roomNum); // 흐름

}
