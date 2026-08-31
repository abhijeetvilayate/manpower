package com.alaqsha.repository;

import com.alaqsha.entity.ContactInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactInfoRepository extends MongoRepository<ContactInfo, String> {
}
