package com.suntech.desafio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.suntech.desafio.model.Residencia;
import com.suntech.desafio.repositories.ResidenciaRepository;
import com.suntech.desafio.services.ResidenciaService;

@RestController
@RequestMapping(value = { "/residencia" })
public class ResidenciaController {
	@Autowired
	ResidenciaRepository repo;

	@GetMapping
	public ResponseEntity<List<Residencia>> getAll() {
		HttpHeaders httpHeaders = new HttpHeaders();
		List<Residencia> todos = repo.findAll();
		return new ResponseEntity<List<Residencia>>(todos, httpHeaders, HttpStatus.OK);
	}

	@Transactional
	@PostMapping
	public ResponseEntity<?> postOne(@RequestBody Residencia req) {
		HttpHeaders httpHeaders = new HttpHeaders();
		try {
			if (!ResidenciaService.validaDados(req)) {
				return new ResponseEntity<String>("Dados inválidos", httpHeaders, HttpStatus.BAD_REQUEST);
			}
			repo.save(req);
			return new ResponseEntity<String>("Criado com sucesso", httpHeaders, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(e.getMessage(), httpHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Transactional
	@DeleteMapping(value="/{id}")
	public ResponseEntity <?> deleteOne(@PathVariable("id") Long id){
		HttpHeaders httpHeaders = new HttpHeaders();
		try {
			
			Residencia doesExist = repo.findById(id);
			if(doesExist==null) {
				return new ResponseEntity <String>("Residencia não cadastrada", httpHeaders, HttpStatus.NOT_FOUND);
			}
			repo.deleteById(id);
			return new ResponseEntity <String>("Residencia deletada com sucesso", httpHeaders, HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity <String>(e.getMessage(), httpHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
