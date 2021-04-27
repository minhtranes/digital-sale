package vn.digitalsaler.app.data.service;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.digitalsaler.app.data.entity.SamplePerson;

import java.time.LocalDate;

public interface SamplePersonRepository extends JpaRepository<SamplePerson, Integer> {

}