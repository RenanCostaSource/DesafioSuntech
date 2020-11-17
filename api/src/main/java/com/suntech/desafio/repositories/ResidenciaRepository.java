package com.suntech.desafio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.suntech.desafio.model.Residencia;

@Repository
public interface ResidenciaRepository extends JpaRepository<Residencia, Integer> {
	Residencia findById(Long id);
	List<Residencia> findByCepAndNumero(int cep, int numero);
	List<Residencia> findAll();
	
	Integer deleteById(Long id);
}
