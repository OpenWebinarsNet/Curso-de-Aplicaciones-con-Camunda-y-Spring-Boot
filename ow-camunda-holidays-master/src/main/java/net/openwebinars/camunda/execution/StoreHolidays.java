package net.openwebinars.camunda.execution;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StoreHolidays implements ExecutionListener {

  private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

  @Override
  public void notify(DelegateExecution execution) throws Exception {
    Object startDate = execution.getVariable("startDate");
    Object endDate = execution.getVariable("endDate");
    Object user = execution.getVariable("initiator");

    LOGGER.warn("REALIZAMOS EL ALMACENAMIENTO DEL RANGO DE VACACIONES");
    LOGGER.warn("La fecha de inicio es => {}", startDate);
    LOGGER.warn("La fecha de fin es => {}", endDate);
    LOGGER.warn("El usuario es => {}", user);
  }
}
