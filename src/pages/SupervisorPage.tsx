import { VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { PtoCompareModal } from '../components/supervisor/PtoCompareModal';
import { TimeOffRequestsSetToWithdraw } from '../components/supervisor/TimeOffRequestsSetToWithdraw';
import { TimeOffRequestsToResolve } from '../components/supervisor/TimeOffRequestsToResolve';
import { UnresolvedTimeOffRequestModal } from '../components/supervisor/UnresolvedTimeOffRequestModal';
import useUnresolvedPtosByAcceptor from '../hooks/useUnresolvedPtosByAcceptor';
import useAuthentication from '../state/useAuthentication';
import useHttpErrorState from '../state/useHttpErrorState';
import usePtoModalStore from '../state/usePtoModalStore';

export const SupervisorPage = () => {
  const appUser = useAuthentication(s => s.appUser);
  const setError = useHttpErrorState(s => s.setError);
  const { ptoToCompareDates, ptoExtendedModal, setPtoToCompareDates, setPtoExtendedModal } = usePtoModalStore();

  const {
    data: unresolvedPtos,
    isFetching: isUnresolvedPtosFetching,
    isLoading: isUnresolvedPtosLoading,
    isError: isUnresolvedPtosError,
    error: unresolvedPtosError,
  } = useUnresolvedPtosByAcceptor(appUser?.userId || -1);

  useEffect(() => {
    isUnresolvedPtosError && setError(unresolvedPtosError);
  }, [isUnresolvedPtosError]);

  const onCloseCompareModal = () => {
    setPtoToCompareDates(undefined);
  };

  const onClosePtoExtendedModal = () => {
    setPtoExtendedModal(undefined);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          width: '99%',
          height: '99%',
        }}
      >
        <PtoCompareModal isOpen={!!ptoToCompareDates} onClose={onCloseCompareModal} />
        <UnresolvedTimeOffRequestModal isOpen={!!ptoExtendedModal} onClose={onClosePtoExtendedModal} />
        <VStack w={'100%'} spacing={'100px'}>
          {unresolvedPtos && unresolvedPtos.filter(p => p.wasMarkedToWithdraw).length > 0 && (
            <TimeOffRequestsSetToWithdraw
              unresolvedPtos={unresolvedPtos?.filter(p => p.wasMarkedToWithdraw)}
              isUnresolvedPtosFetching={isUnresolvedPtosFetching}
              isUnresolvedPtosLoading={isUnresolvedPtosLoading}
            />
          )}
          <TimeOffRequestsToResolve
            unresolvedPtos={unresolvedPtos?.filter(p => !p.wasMarkedToWithdraw)}
            isUnresolvedPtosFetching={isUnresolvedPtosFetching}
            isUnresolvedPtosLoading={isUnresolvedPtosLoading}
          />
        </VStack>
      </motion.div>
    </AnimatePresence>
  );
};
