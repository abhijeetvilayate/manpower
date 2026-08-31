package com.alaqsha.repository;

import com.alaqsha.entity.Industry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndustryRepository extends MongoRepository<Industry, String> {
}
