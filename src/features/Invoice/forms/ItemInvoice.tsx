import React from 'react';
import { useLocation } from 'react-router-dom';

const ItemInvoicePage = () => {
    const search = useLocation().search;
    const invoiceId = new URLSearchParams(search).get('invoiceId') || '';
    console.log('invoiceId', invoiceId);
    
    return (
        <div>
            {invoiceId}
        </div>
    );
};

export default ItemInvoicePage;