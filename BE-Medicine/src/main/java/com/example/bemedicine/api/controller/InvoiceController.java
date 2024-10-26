package com.example.bemedicine.api.controller;

import com.example.bemedicine.api.model.*;
import com.example.bemedicine.api.repository.*;
import com.example.bemedicine.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class InvoiceController {
    @Autowired
    private InvoiceRepository invoiceRepository;

    // Hiển thị tất cả các hóa đơn
    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return new ResponseEntity<>(invoices, HttpStatus.OK);
    }

    // Hiển thị một hóa đơn theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        Optional<Invoice> invoiceOptional = invoiceRepository.findById(id);
        return invoiceOptional.map(invoice -> new ResponseEntity<>(invoice, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/invoices/{orderID}")
    public ResponseEntity<Invoice> getInvoiceByOrderId(@PathVariable Long orderID) {
        Optional<Invoice> invoice = invoiceRepository.findByOrderID(orderID);
        if (invoice != null) {
            return new ResponseEntity<>( HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // Thêm hóa đơn mới
    @Autowired
    private InvoiceService invoiceService;

    // Create or get an existing invoice
    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice createdInvoice = invoiceService.createInvoiceIfNotExists(invoice);
        return ResponseEntity.ok(createdInvoice); // Return the existing or newly created invoice
    }



    // Xóa hóa đơn
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteInvoice(@PathVariable Long id) {
        Optional<Invoice> invoiceOptional = invoiceRepository.findById(id);
        return invoiceOptional.map(invoice -> {
            invoiceRepository.delete(invoice);
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
