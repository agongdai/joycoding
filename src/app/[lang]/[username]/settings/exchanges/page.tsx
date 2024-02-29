import React from 'react';
import { SessionProvider } from 'next-auth/react';

import { faLink } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { auth } from '@myex/auth';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexImage from '@myex/components/MyexImage';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';
import exchanges from '@myex/data/exchanges.json';
import { StyleVariant } from '@myex/types/common';

import Form from './form';

export default async function ExchangesPage() {
  const session = await auth();
  return (
    <MyexStyledPageWrapper>
      <h1>Exchanges</h1>
      <SessionProvider session={session}>
        <div className='max-w-[80rem] my-6 shadow-lg'>
          {exchanges.map((exchange) => {
            const hasExchange = session?.user?.exchanges?.find((e) => e.name === exchange.name);
            return (
              <Accordion key={exchange.name}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`exchange-${exchange.name}-content`}
                  id={`exchange-${exchange.name}-header`}
                >
                  <MyexImage src={exchange.icon} alt={exchange.name} width={28} height={28} />
                  <span className='inline-block mx-3'>{exchange.name}</span>
                  {hasExchange && (
                    <AwesomeIcon icon={faLink} variant={StyleVariant.Success} size='lg' />
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <Form exchangeName={exchange.name} />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </SessionProvider>
    </MyexStyledPageWrapper>
  );
}
