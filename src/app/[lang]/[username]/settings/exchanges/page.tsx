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
            const hasConnected = session?.user?.exchangeApis?.find(
              (e) => e.exchangeId === exchange.exchangeId,
            );
            return (
              <Accordion key={exchange.name}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`exchange-${exchange.exchangeId}-content`}
                  id={`exchange-${exchange.exchangeId}-header`}
                >
                  <MyexImage src={exchange.icon} alt={exchange.exchangeId} width={28} height={28} />
                  <span className='inline-block mx-3'>{exchange.name}</span>
                  {hasConnected && (
                    <AwesomeIcon icon={faLink} variant={StyleVariant.Success} size='lg' />
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <Form exchangeId={exchange.exchangeId} />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </SessionProvider>
    </MyexStyledPageWrapper>
  );
}
