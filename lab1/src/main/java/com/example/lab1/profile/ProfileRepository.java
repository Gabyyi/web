package com.example.lab1.profile;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query("""
            SELECT p FROM Profile p
            WHERE (
                :name IS NULL OR :name = ''
                OR LOWER(p.fname) LIKE LOWER(CONCAT('%', :name, '%'))
                OR LOWER(p.lname) LIKE LOWER(CONCAT('%', :name, '%'))
                OR LOWER(CONCAT(p.fname, ' ', p.lname)) LIKE LOWER(CONCAT('%', :name, '%'))
            )
            AND (
                :skills IS NULL OR :skills = ''
                OR LOWER(p.SKILLS) LIKE LOWER(CONCAT('%', :skills, '%'))
            )
            ORDER BY p.id DESC
            """)
    List<Profile> search(@Param("name") String name, @Param("skills") String skills);
}
