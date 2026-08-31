package com.alaqsha.repository;

import com.alaqsha.entity.JobOpening;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface JobOpeningRepository extends MongoRepository<JobOpening, String> {
    void deleteByDeadlineBefore(LocalDate date);
    List<JobOpening> findByDeadlineGreaterThanEqual(LocalDate date);
}
