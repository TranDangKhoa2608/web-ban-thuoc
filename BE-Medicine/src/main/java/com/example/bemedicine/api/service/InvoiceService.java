package com.example.bemedicine.api.service;

import com.example.bemedicine.api.model.Invoice;
import com.example.bemedicine.api.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    // Method to check if an invoice exists for a given orderID
    public Optional<Invoice> getInvoiceByOrderID(Long orderID) {
        return invoiceRepository.findByOrderID(orderID);
    }

    // Method to create a new invoice if it does not already exist
    public Invoice createInvoiceIfNotExists(Invoice invoice) {
        Optional<Invoice> existingInvoice = getInvoiceByOrderID(invoice.getOrderID());
        if (existingInvoice.isPresent()) {
            // Return the existing invoice if it already exists
            return existingInvoice.get();
        } else {
            // Save and return the new invoice
            return invoiceRepository.save(invoice);
        }
    }
}

