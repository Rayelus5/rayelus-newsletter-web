import * as React from 'react';

interface EmailTemplateProps {
    content: string;
    title: string;
}

export const NewsletterEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    content,
    title,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5', color: '#1a1a1a' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #eaeaea' }} />
        <p style={{ fontSize: '12px', color: '#666' }}>
            Recibes este correo porque estás suscrito a nuestra newsletter.
            <br />
            <a href={`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe`} style={{ color: '#666', textDecoration: 'underline' }}>
                Darse de baja
            </a>
        </p>
    </div>
);
