package com.alaqsha.repository;

import com.alaqsha.entity.ServiceItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends MongoRepository<ServiceItem, String> {
}
