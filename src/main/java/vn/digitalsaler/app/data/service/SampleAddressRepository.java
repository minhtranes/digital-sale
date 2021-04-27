package vn.digitalsaler.app.data.service;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.digitalsaler.app.data.entity.SampleAddress;

public interface SampleAddressRepository extends JpaRepository<SampleAddress, Integer> {

}