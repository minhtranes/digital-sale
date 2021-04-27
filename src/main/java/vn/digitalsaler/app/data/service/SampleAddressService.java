package vn.digitalsaler.app.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vaadin.artur.helpers.CrudService;

import vn.digitalsaler.app.data.entity.SampleAddress;

@Service
public class SampleAddressService extends CrudService<SampleAddress, Integer> {

    private SampleAddressRepository repository;

    public SampleAddressService(@Autowired SampleAddressRepository repository) {
        this.repository = repository;
    }

    @Override
    protected SampleAddressRepository getRepository() {
        return repository;
    }

}
