package com.maeve.importer.infra.job;

import static java.util.Objects.nonNull;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.maeve.importer.application.ImporterApplicationService;
import com.maeve.importer.domain.JobService;
import com.maeve.importer.domain.job.JobExecution;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Cron based job class that will periodically trigger the importation of Datadog logs.
 * <p>Has a spring @PostConstruct annotation to trigger job upon application start up.</p>
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
@Slf4j
public class ImporterJob {

    private ImporterApplicationService importerApplicationService;
    private JobService jobService;

    @PostConstruct
    public void runImporterJobOnApplicationStartup() {
        importerJobStart();
    }

    /**
     * Triggers the importation of Datadog logs from the range of the last Job execution to the current {@link java.time.LocalDateTime}.
     * <p>If no previous job execution is found, the job will create a starting point at 1970-01-01-00:00:00 and await next scheduled execution.</p>
     * <p>CRON expression for job schedule is configured in the application properties.</p>
     *
     * @author Pelicer
     */
    @Scheduled(cron = "${jobs.importer.cron}")
    public void importerJobStart() {
        log.info("Starting importer job execution");

        final JobExecution jobExecution = jobService.getLastJobExecution();
        if(nonNull(jobExecution)) {
            final LocalDateTime from = jobExecution.getTimestamp();
            final LocalDateTime to = LocalDateTime.now().withSecond(0).withNano(0);
            importerApplicationService.importDatadogLogs(from, to);
            jobService.saveJobExecution(new JobExecution(to));
            log.info("Import job executed successfully");
        }
        else {
            jobService.saveJobExecution(new JobExecution(LocalDateTime.of(1970, 01, 01, 0, 0, 0)));
            log.warn(
                    "No instance of importer job execution found. The service will create one from 1970-01-01. Please note that is advised against, since a lot of unwanted logs could be imported");
        }
    }
}
