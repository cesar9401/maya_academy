package com.maya.academy.service;

import com.maya.academy.repository.OptionCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OptionService {

    @Autowired
    private OptionCrudRepository repository;

    public Boolean deleteOption(int id) {
        return repository.findById(id).map(o -> {
            repository.deleteById(o.getOptionId());
            return true;
        }).orElse(false);
    }
}
